declare namespace __WSRTests {
  interface EditableSelectorUniDriver extends BaseUniDriver {
    items: () => Array<SelectorUniDriver>;
    exists: () => Promise<boolean>;
    isEditing: () => Promise<boolean>;
    isEditingRow: () => Promise<boolean>;
    isAddingRow: () => Promise<boolean>;
    newRowButton: () => Promise<HTMLElement>;
    deleteButtonAt: (index: number) => Promise<HTMLElement>;
    editButtonAt: (index: number) => Promise<HTMLElement>;
    addNewRow: (label: string) => Promise<void>;
    editRow: (index: number, label: string) => Promise<void>;
    deleteRow: (index: number) => Promise<void>;
    startAdding: () => Promise<void>;
    startEditing: (index: number) => Promise<void>;
    clickApprove: () => Promise<void>;
    clickCancel: () => Promise<void>;
    title: () => Promise<string>;
    toggleItem: (index: number) => Promise<string>;
  }
}
