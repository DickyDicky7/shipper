import { writable, type Writable } from "svelte/store";

type AuthResult = {
    data: {
        token: string,
        id   : string,
        role : string,
    }
};

const AuthResultStore: Writable<AuthResult> = writable({
    data: {
        token: "",
        id   : "",
        role : "",
    }
});

type StaffResult = {
    staff: {
        age               : number,
        gender            : string,
        hubId             : string,
        motorcycleCapacity: number,
        name              : string,
        userId            : string,
        weight            : number,
        __v               : number,
        _id               : string,
    }
};

const StaffResultStore: Writable<StaffResult> = writable({
    staff: {
        age               : 0 ,
        gender            : "",
        hubId             : "",
        motorcycleCapacity: 0 ,
        name              : "",
        userId            : "",
        weight            : 0 ,
        __v               : 0 ,
        _id               : "",
    }
});

type GeneralDisplay = {
    title: string,
};

const GeneralDisplayStore: Writable<GeneralDisplay> = writable({
    title: "None",
});

enum SCREEN {
    HOME            ,
    AUTH            ,
    PICK_UP_NEW     ,
    PICK_UP_ON_GOING,
    DELIVER_NEW     ,
    DELIVER_ON_GOING,
};

const                ScreensHistoryStore
  :   Writable<Array<SCREEN>> = writable([

]);

export {
    type AuthResult,
    AuthResultStore,
    type StaffResult,
    StaffResultStore,
    type GeneralDisplay,
    GeneralDisplayStore,
    SCREEN             ,
    ScreensHistoryStore,
};

