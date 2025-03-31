class WDraft {
  static instance

  constructor() {
    if (WDraft?.instance) {
      return WDraft.instance
    }
    this.draft = new Map()
    WDraft.instance = this
  }

  has(key) {
    return this.draft.has(key)
  }

  get(key) {
    return this.draft.get(key)
  }

  set(key, cell) {
    this.draft.set(key, cell)
  }

  delete(key) {
    this.draft.delete(key)
  }
}

export default WDraft
