export const initialState = {
    ui: {
        errors: null,
        loading: false,
        authenticated: false,
        syncPending: false,
        downloadPending: true,
        userInitialised: false,
        undoAble: false,
    },
    user: {},
    db: {
        tasks: [],
        objectives: [],
        actions: [],
        habits: [],
    },
    lastAction: {
        ref: '',
        type: '',
        data: {},
    },
    quotes: [
        'Do it because you said you would. Uphold the standard you set for yourself.',
        'Reject any excuses, take ownership of your situation & your life will change.',
        'Either find a way. Or make one',
        'Do or do not. There is no try.',
        'Understand that nobody owes you a thing.',
        'Do not be afraid to take risks. Everything you want is on the other side of fear.',
        'The rent is due. Pay the man.',
    ],
}
