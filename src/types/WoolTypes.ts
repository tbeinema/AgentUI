declare global {
  const _wool: {
    DirectServer: new () => WoolServer,
  };
}

export type WoolServer = {
  loadDialogue(dialogueId: string, dialogue: string): void;
  startDialogue(parameters: StartDialogueParams): WoolNode;
  parseActionsBeforeProgress(parameters: ProgressDialogueParams): void;
  progressDialogue(parameters: ProgressDialogueParams): WoolNode;
  getNode(): WoolNode;
}

type StartDialogueParams = {
  dialogueId: string;
  startNodeId: string;
  keepVars: boolean;
  externalVars: Record<string, unknown>;
};

type ProgressDialogueParams = {
  replyId: string;
  replyIndex: number;
  textInput?: string;
};

export type WoolNode = {
  id: string;
  replies: WoolReply[];
  pendingActions: WoolPendingAction[];
  statement: string;
}

export type WoolReplyType =
  'AUTOFORWARD'
  | 'BASIC'
  | 'NUMERICINPUT'
  | 'TEXTINPUT';

export type WoolReply = {
  replyId: string;
  replyType: WoolReplyType,
  beforeStatement?: string;
  afterStatement?: string;
  statement?: string;
}

export type WoolPendingAction = {
  type: string;
  value: string;
}
