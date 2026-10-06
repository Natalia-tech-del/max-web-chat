export type TSession = {
    idInstance: string;
    apiTokenInstance: string;
}

export type TSessionState = {
    session: TSession | null
}

export type TSessionActions = {
    login: (session: TSession) => void
    logout: () => void
}

export type TSessionStore = TSessionState & TSessionActions