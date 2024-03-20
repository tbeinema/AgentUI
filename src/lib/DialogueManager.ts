import {App, computed, ComputedRef, inject, ref} from 'vue';
import {WoolNode, WoolServer} from '../types/WoolTypes';

const WoolDialogManager = Symbol('WoolDialogManager');

/** Use this method to inject the dialog manager into the component */
export function useDialogManager(): DialogueManagerInterface {
  const dialogManager = inject<DialogueManager>(WoolDialogManager);
  if (!dialogManager) {
    throw new Error('Dialog manager not available, did you enable the plugin?');
  }

  return dialogManager;
}

type DialogueManagerOptions = {
  dialogueFile: string;
};

export default function (app: App, options: DialogueManagerOptions): void {
  const dialogManager = new DialogueManager(options.dialogueFile);

  app.provide(WoolDialogManager, dialogManager);
}

interface DialogueManagerInterface {
  readonly isLoaded: ComputedRef<boolean>;
  readonly errorMessage: ComputedRef<string|null>;
  readonly currentStep: ComputedRef<WoolNode>;
  readonly isEnded: ComputedRef<boolean>;

  progressDialogue: (replyId: string, replyIndex: number, inputText?: string) => void;
  restart: () => void;
}

export class DialogueManager implements DialogueManagerInterface {
  private readonly dialogueId: 'your-dialogue';
  private readonly server: WoolServer;

  private dialogueNodes = ref<WoolNode[]>([]);

  private readonly _isLoaded = ref(false);
  public readonly isLoaded = computed(() => this._isLoaded.value);
  private readonly _errorMessage = ref(null);
  public readonly errorMessage = computed(() => this._errorMessage.value);

  // Reference to the latest inserted step, so that we can display it
  public readonly currentStep = computed(() => this.dialogueNodes.value[this.dialogueNodes.value.length - 1]);

  // State shortcuts (as we use these checks in multiple places, and we don't want to clutter the template below)
  public readonly isEnded = computed(() => this.currentStep.value?.id === 'End');

  constructor(dialogueFile: string) {
    // Create the WOOL server
    this.server = new _wool.DirectServer();

    import(`@/dialogues/${dialogueFile}.wool?raw`)
      .then(dialogueData => {
        // This loads the dialogue from the .wool file
        this.server.loadDialogue(this.dialogueId, dialogueData.default);

        // Start the dialogue
        this.startDialogue();

        // Mark as loaded
        this._isLoaded.value = true;
      })
      .catch(e => {
        this._errorMessage.value = e.message;
        this._isLoaded.value = true;
      });
  }

  /** Method to submit a chosen reply, so that we can get the next step in the dialogue. */
  public progressDialogue = (replyId: string, replyIndex: number, inputText?: string): void => {
    const parameters = {
      replyId,
      replyIndex,
      textInput: inputText !== '' ? inputText : undefined,
    };
    this.server.parseActionsBeforeProgress(parameters);
    this.pushDialogueNode(this.server.progressDialogue(parameters));
  }

  /** Restarts the currently loaded dialogue */
  public restart = (): void => {
    this.dialogueNodes.value = [];
    this.startDialogue();
  }

  /** This starts the dialogue with the "Start" node, and inserts in into the step history. */
  private startDialogue(): void {
    this.pushDialogueNode(this.server.startDialogue({
      dialogueId: this.dialogueId,
      startNodeId: 'Start',
      keepVars: true,
      externalVars: {},
    }));
  }

  /** Pushes the dialogue node to the step history */
  private pushDialogueNode(node: WoolNode): void {
    console.log('Adding dialogue step', node);
    this.dialogueNodes.value.push(node);
  }
}

