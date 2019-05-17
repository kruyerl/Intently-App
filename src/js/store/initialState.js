export const initialState = {
    authenticated: false,
    syncPending: false,
    downloadPending: true,
    ui: {
        errors: null,
        loading: false,
    },
    db: {
        tasks: [],
        objectives: [],
        actions: [],
        habits: [],
    },
    quotes: [
        'I will do it because I said I would. I will uphold the standard I set for myself.',
        'I will reject my excuses and take ownership of my situation. I will change my life.',
        'I will find a way or make one.',
        'I understand that nobody owes me a thing. I must earn my portion.',
        'The rent is due. Pay the man.',
    ],
}
