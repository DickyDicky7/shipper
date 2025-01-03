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
    HOME           ,
    AUTH           ,
    DELIVER_PICK_UP,
    DELIVER_ONGOING,
    DELIVER_HISTORY,
    DELIVER_UNKNOWN,
};

const                ScreensHistoryStore
  :   Writable<Array<SCREEN>> = writable([

]);

export enum ShipmentType { Document = "Document", Package = "Package", Parcel = "Parcel", };
export enum DeliveryType { Standard = "Standard", Express = "Express",
                                                  SameDay = "SameDay",                    };

type   SenderInfo = {
    userId     : string,
    name       : string,
    address    : string,
    phoneNumber: string,
};

type ReceiverInfo = {
    userId     : string,
    name       : string,
    address    : string,
    phoneNumber: string,
};

type DeliveryInfo = {
    shipmentType: ShipmentType,
    deliveryType: DeliveryType,
    status      : string,
    packageSize : number,
    pickupDate  : string,
    pickupTime  : string,
    value       : number,
};

type Order = {
      senderInfo:   SenderInfo,
    receiverInfo: ReceiverInfo,
    deliveryInfo: DeliveryInfo,
    hubId       : string,
    message     : string,
    podTxt      : string,
    podImg      : string,
    payStatus   : string,
    payWith     : string,
    __v         : number,
    _id         : string,
};

type Delivery = {
    staffId: string,
    orderId: string,
      hubId: string,
    date        : string,
    deliverTimes: number,
          status: string,
    __v         : number,
    _id         : string,
}

const DisplaySuccSnackbar = async (content: string, millisecondsToHide: number): Promise<void> => {
    let succSnackbar = document.getElementById("succ-snackbar");
    if (succSnackbar) {
        succSnackbar . innerText = content;
        await ui("#succ-snackbar"
            , millisecondsToHide);
    }
};

const DisplayFailSnackbar = async (content: string, millisecondsToHide: number): Promise<void> => {
    let failSnackbar = document.getElementById("fail-snackbar");
    if (failSnackbar) {
        failSnackbar . innerText = content;
        await ui("#fail-snackbar"
            , millisecondsToHide);
    }
};

const DisplayInfoSnackbar = async (content: string, millisecondsToHide: number): Promise<void> => {
    let infoSnackbar = document.getElementById("info-snackbar");
    if (infoSnackbar) {
        infoSnackbar . innerText = content;
        await ui("#info-snackbar"
            , millisecondsToHide);
    }
};

const isScrolledToBottom = (): boolean => {
const threshold : number = 1;
    return (
        window.innerHeight
    +   window.scrollY >= document.documentElement.scrollHeight - threshold
    );
};

const DeliverPick_UpStore: Writable<Delivery[]> = writable(Array.from({ length: 20 }, (value: unknown, index: number) => {
    return {
        staffId: `${index}`,
        orderId: `${index}`,
          hubId: `${index}`,
        date        : `${index}`,
        deliverTimes: 0         ,
              status: `${index}`,
        __v         : 0         ,
        _id         : `${index}`,
    };
}));

const DeliverOnGoingStore: Writable<Delivery[]> = writable(Array.from({ length: 20 }, (value: unknown, index: number) => {
    return {
        staffId: `${index}`,
        orderId: `${index}`,
          hubId: `${index}`,
        date        : `${index}`,
        deliverTimes: 0         ,
              status: `${index}`,
        __v         : 0         ,
        _id         : `${index}`,
    };
}));

const DeliverHistoryStore: Writable<Delivery[]> = writable(Array.from({ length: 20 }, (value: unknown, index: number) => {
    return {
        staffId: `${index}`,
        orderId: `${index}`,
          hubId: `${index}`,
        date        : `${index}`,
        deliverTimes: 0         ,
              status: `${index}`,
        __v         : 0         ,
        _id         : `${index}`,
    };
}));

const DeliverUnknownStore: Writable<Delivery[]> = writable(Array.from({ length: 20 }, (value: unknown, index: number) => {
    return {
        staffId: `${index}`,
        orderId: `${index}`,
          hubId: `${index}`,
        date        : `${index}`,
        deliverTimes: 0         ,
              status: `${index}`,
        __v         : 0         ,
        _id         : `${index}`,
    };
}));

const CurrentDeliveryStore: Writable<Delivery> = writable({
    staffId: ``,
    orderId: ``,
      hubId: ``,
    date        : ``,
    deliverTimes: 0 ,
          status: ``,
    __v         : 0 ,
    _id         : ``,

});
const CurrentOrder___Store: Writable<Order   > = writable({
      senderInfo: { userId     : `01234`,
                    name       : `Dicky`,
                    address    : `Dicky`,
                    phoneNumber: `01234`,
                  } ,
    receiverInfo: { userId     : `01234`,
                    name       : `Dicky`,
                    address    : `Dicky`,
                    phoneNumber: `01234`,
                  } ,
    deliveryInfo: { shipmentType: ShipmentType.Package,
                    deliveryType: DeliveryType.Express,
                    status      : `pending`   ,
                    packageSize : 0           ,
                    pickupDate  : `01-01-2024`,
                    pickupTime  : `00:00:0000`,
                    value       : 0           ,
                  } ,
    hubId       : `0123456`,
    message     : `Message`,
    podTxt      : `-------`,
    podImg      : `-------`,
    payStatus   : `-------`,
    payWith     : `-------`,
    __v         : 0        ,
    _id         : `0123456`,
});

function getUniqueDateTimeString(): string {
    const now          =        new        Date();
    const year         =        now.getFullYear();
    const month        = String(now.getMonth       () + 1).padStart(2, "0");
    const day          = String(now.getDate        ()    ).padStart(2, "0");
    const hours        = String(now.getHours       ()    ).padStart(2, "0");
    const minutes      = String(now.getMinutes     ()    ).padStart(2, "0");
    const seconds      = String(now.getSeconds     ()    ).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()    ).padStart(3, "0");
    return `${year}${month}${day}_${hours}${minutes}${seconds}${milliseconds}`;
};

type  QR1 = {
           orderId: string,
    //obsolete
    deliveryStatus: string,
    //obsolete
};

const QR1Store: Writable<QR1> = writable({
           orderId: "",
    //obsolete
    deliveryStatus: "",
    //obsolete
});

import * as transition from
    "svelte/transition"    ;
import * as easing     from
    "svelte/easing"        ;

const MyBlurParams = (delay: number): transition.BlurParams => {
    return {
        delay   : delay            ,
        duration: 1000             ,
        easing  : easing.quintInOut,
        amount  : 10               ,
        opacity : 0                ,
    };
};

import axios
from  "axios"
 ;

const GeocodingOpenCage_Async = async (q: string): Promise<{ lat: number, lng: number }> => {
    const   result =   ({
        lat: 0.0,
        lng: 0.0,
    });
    const response = await axios.get("https://api.opencagedata.com/geocode/v1/json"
                                                 ,
    {
        params: {
//         key: "0348f6405b984fc6a71cc571e8dfe485"
           key: "f650506253b34d5482b87e9459cd7823"
    ,        q: q
    ,   pretty: 1
    , language:
      "native"
    ,
        }
    });
    const responseFirstResult = response.data.results[0]?.geometry;
    result.lat = responseFirstResult ? parseFloat(responseFirstResult.lat) : result.lat;
    result.lng = responseFirstResult ? parseFloat(responseFirstResult.lng) : result.lng;
    return result;
};

export {
    type AuthResult,
    AuthResultStore,
    type StaffResult,
    StaffResultStore,
    type GeneralDisplay,
    GeneralDisplayStore,
    SCREEN             ,
    ScreensHistoryStore,
    DisplaySuccSnackbar,
    DisplayFailSnackbar,
    DisplayInfoSnackbar,
    isScrolledToBottom ,
    DeliverPick_UpStore,
    DeliverOnGoingStore,
    DeliverHistoryStore,
    DeliverUnknownStore,
    CurrentDeliveryStore,
    CurrentOrder___Store,
    getUniqueDateTimeString,
    GeocodingOpenCage_Async,
    type QR1,
    QR1Store,
    MyBlurParams,
};

