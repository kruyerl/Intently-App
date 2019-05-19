export const initialState = {
    ui: {
        errors: null,
        loading: false,
        authenticated: false,
        syncPending: false,
        downloadPending: true,
        userInitialised: false,
    },
    user: {},
    db: {
        tasks: [],
        objectives: [],
        actions: [],
        habits: [],
    },
    quotes: [
        "Do it because you said you would. Uphold the standard you set for yourself.",
        "Reject any excuses, take ownership of your situation & your life will change.",
        "Either find a way. Or make one",
        "Understand that nobody owes you a thing.",
        "Understand that nobody owes you a thing. All.",
        "Do not be afraid to take risks. Everything you want is on the other side of fear.",
        "The rent is due. Pay the man.",
    ],
}
