<script lang="ts">
    import     axios   from "axios"       ;
    import { onMount } from       "svelte";
    import {
        StaffResultStore       ,
        CurrentDeliveryStore   ,
        CurrentOrder___Store   ,
        getUniqueDateTimeString,
        DisplaySuccSnackbar    ,
        DisplayFailSnackbar    ,
        DisplayInfoSnackbar    ,
        QR1Store               ,
    } from "../global";
    import { CapacitorBarcodeScanner
           , CapacitorBarcodeScannerTypeHint
           }                            from "@capacitor/barcode-scanner";
    import { Camera
           , CameraResultType
           , CameraSource
           , CameraDirection
           ,      type Photo
    } from "@capacitor/camera";

    const getCurrentDate = (): string => {
    const now   = new        Date();
    const  year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, `0`); // Months are zero-based
    const day   = String(now.getDate ()    ).padStart(2, `0`);
    return `${year}-${month}-${day}`;
    };

    const OnClick_CloseButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        await ui("#deliver-detail");
    };

    const OnClick_QRCodeButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        // await ui("#deliver-detail");
        const scanQRResult = await CapacitorBarcodeScanner/*----*/.scanBarcode({
                             hint: CapacitorBarcodeScannerTypeHint.    ALL
        });

                 $QR1Store = JSON.parse(scanQRResult.ScanResult);

        const updateResult = await axios.put(
            "/protected/order/devStatus",
            {
                  orderId: $QR1Store.       orderId,
//              devStatus: $QR1Store.deliveryStatus,
//              payStatus:                         ,
            },
            {
                baseURL: "https://waseminarcnpm2.azurewebsites.net",
            },
        );

        if (updateResult.status === 200
        ||  updateResult.status === 201) {
            await DisplaySuccSnackbar("QR update success", 1000);

            const insertNotificationResult = await axios.post(
                "/protected/notification",
                {
                       orderId: updateResult.data.order.                _id,
                      senderId: updateResult.data.order.  senderInfo.userId,
                    receiverId: updateResult.data.order.receiverInfo.userId,
                          date: getCurrentDate()                           ,
                        status: updateResult.data.order.deliveryInfo.status,
                         about:                        "delivery"          ,
                },
                {
                    baseURL: "https://waseminarcnpm2.azurewebsites.net",
                },
            );
            const status: string =
            updateResult.data.order.deliveryInfo.status;
            const pushNotification1Result = await axios.post(
                "/protected/one-signal/send-push-notification/"            ,
                {
                        userId: updateResult.data.order.  senderInfo.userId,
                     contentEn:
                    status === "inProgress"                         ? "You have delivered to the @carrier@" :
                    status ===            "success"                 ? "The order has been delivered to the @@@@@@@@@ @@ @@@ receiver" :
                    status ===                    "failed"          ? "The order has been failed@@@ to be@ delivered to the receiver" :
                    status ===                           "canceled" ? "The order has been @returned to you" : "~~~",
                     headingEn: `The order ${updateResult.data.order._id} has an delivery update.`,
                    subtitleEn: `    Empty                                                       `,
                },
                {
                    baseURL: "https://waseminarcnpm2.azurewebsites.net",
                },
            );
            const pushNotification2Result = await axios.post(
                "/protected/one-signal/send-push-notification/"            ,
                {
                        userId: updateResult.data.order.receiverInfo.userId,
                     contentEn:
                    status === "inProgress"                         ? "The order has been delivered to the carrier" :
                    status ===            "success"                 ? "The order has been delivered to you @@@@@@@" :
                    status ===                    "failed"          ? "The order has been failed@@@ to be delivered to you (rejected 3 times)" :
                    status ===                           "canceled" ? "~~~"
                                                                    : "~~~"                       ,
                     headingEn: `The order ${updateResult.data.order._id} has an delivery update!`,
                    subtitleEn: `    Empty                                                       `,
                },
                {
                    baseURL: "https://waseminarcnpm2.azurewebsites.net",
                },
            );



            const           delivery_UpdatedStatusResult1 = await axios.post(
                "/protected/delivery/update_status"
                 ,
                {
                    deliveryId: $CurrentDeliveryStore?._id ?? "-",
                        status:
                        status                                   ,
                },
                {
                    baseURL: "https://waseminarcnpm2.azurewebsites.net"
                 ,
                },
            );

            const oUpdatedResult = await axios.get(
                       `https://waseminarcnpm2.azurewebsites.net/protected/order?id=${$CurrentDeliveryStore.orderId}`
            );
            if (oUpdatedResult.status === 200
            ||  oUpdatedResult.status === 201) {
                $CurrentOrder___Store = oUpdatedResult.data ;
            }
            
            const dUpdatedResult = await axios.get(
         `https://waseminarcnpm2.azurewebsites.net/protected/delivery/id?deliveryId=${$CurrentDeliveryStore.    _id}`
            );
            if (dUpdatedResult.status === 200
            ||  dUpdatedResult.status === 201) {
                $CurrentDeliveryStore = dUpdatedResult.data ;
            }
        } else {
            await DisplayFailSnackbar("QR update failure", 1000);
            return;
        }
    };

    const OnClick_CameraButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        // await ui("#deliver-detail");

        const image = await Camera.getPhoto({            
            quality           : 100                    ,
            allowEditing      : true                   ,
            resultType        : CameraResultType.Base64,
            saveToGallery     : false                  ,
            width             : undefined              ,
            height            : undefined              ,
            correctOrientation: true                   ,
            source            : CameraSource    .Prompt,
            direction         : CameraDirection .Rear  ,
            presentationStyle : undefined              ,
            webUseInput       : undefined              ,
            promptLabelHeader : undefined              ,
            promptLabelCancel : undefined              ,
            promptLabelPhoto  : undefined              ,
            promptLabelPicture: undefined              ,
        });
        const imageName: string = `${$StaffResultStore.staff._id}_${getUniqueDateTimeString()}`;

        const result1 = await axios.post(
            "/protected/delivery/update_status",
            {
                deliveryId: $CurrentDeliveryStore._id,
                    status: "success"                ,
            },
            {
                baseURL: "https://waseminarcnpm2.azurewebsites.net",
            },
        );


        if (result1.status === 200
        ||  result1.status === 201) {
            await DisplaySuccSnackbar("Step 01 success", 1000);
        } else {
            await DisplayFailSnackbar("Step 01 failure", 1000);
            return;
        }


        const result2 = await axios.post(
            "/up-img",
            {
                image    :                 image.base64String,
                imageName: $CurrentOrder___Store._id         ,
            },
            {
                baseURL: "https://waseminarcnpm2.azurewebsites.net",
            },
        );


        if (result2.status === 200
        ||  result2.status === 201) {
            await DisplaySuccSnackbar("Step 02 success", 1000);
        } else {
            await DisplayFailSnackbar("Step 02 failure", 1000);
            return;
        }


        const result3 = await axios.post(
            "/protected/extract-text-from-image",
            {
                //-----------------------------------------
                image_url: result2.data.realData.publicUrl,
                //-----------------------------------------
            },
            {
                //--------------------------------------------------
                baseURL: "https://waseminarcnpm2.azurewebsites.net",
                //--------------------------------------------------
            },
        );


        if (result3.status === 200
        ||  result3.status === 201) {
            await DisplaySuccSnackbar("Step 03 success", 1000);
        } else {
            await DisplayFailSnackbar("Step 03 failure", 1000);
            return;
        }


        const result4 = await axios.put(
            `/protected/order?id=${$CurrentOrder___Store._id}`,
            {
                podTxt: result3.data.         extracted_text,
                podImg: result2.data.realData.publicUrl     ,
            },
            {
                baseURL: "https://waseminarcnpm2.azurewebsites.net",
            },
        );


        if (result4.status === 200
        ||  result4.status === 201) {
            await DisplaySuccSnackbar("Step 04 success", 1000);
        } else {
            await DisplayFailSnackbar("Step 04 failure", 1000);
            return;
        }

        const oUpdatedResult = await axios.get(
                   `https://waseminarcnpm2.azurewebsites.net/protected/order?id=${$CurrentDeliveryStore.orderId}`
        );
        if (oUpdatedResult.status === 200
        ||  oUpdatedResult.status === 201) {
            $CurrentOrder___Store = oUpdatedResult.data ;
        }
        
        const dUpdatedResult = await axios.get(
     `https://waseminarcnpm2.azurewebsites.net/protected/delivery/id?deliveryId=${$CurrentDeliveryStore.    _id}`
        );
        if (dUpdatedResult.status === 200
        ||  dUpdatedResult.status === 201) {
            $CurrentDeliveryStore = dUpdatedResult.data ;
        }


        const insertNotificationResult = await axios.post(
            "/protected/notification",
            {
                   orderId: $CurrentOrder___Store.                _id,
                  senderId: $CurrentOrder___Store.  senderInfo.userId,
                receiverId: $CurrentOrder___Store.receiverInfo.userId,
                      date: getCurrentDate()                         ,
                    status: $CurrentOrder___Store.deliveryInfo.status,
                     about:                      "delivery"          ,
            },
            {
                baseURL: "https://waseminarcnpm2.azurewebsites.net"  ,
            },
        );
        const status: string =
        $CurrentOrder___Store.deliveryInfo.status;
        const pushNotification1Result =            await axios.post(
            "/protected/one-signal/send-push-notification/"          ,
            {
                    userId: $CurrentOrder___Store.  senderInfo.userId,
                 contentEn:
                status === "inProgress"                         ? "You have delivered to the @carrier@" :
                status ===            "success"                 ? "The order has been delivered to the @@@@@@@@@ @@ @@@ receiver" :
                status ===                    "failed"          ? "The order has been failed@@@ to be@ delivered to the receiver" :
                status ===                           "canceled" ? "The order has been @returned to you" : "~~~",
                 headingEn: `The order ${$CurrentOrder___Store._id} has an delivery update.`,
                subtitleEn: `    Empty                                                     `,
            },
            {
                baseURL: "https://waseminarcnpm2.azurewebsites.net"  ,
            },
        );
        const pushNotification2Result =            await axios.post(
            "/protected/one-signal/send-push-notification/"          ,
            {
                    userId: $CurrentOrder___Store.receiverInfo.userId,
                 contentEn:
                status === "inProgress"                         ? "The order has been delivered to the carrier" :
                status ===            "success"                 ? "The order has been delivered to you @@@@@@@" :
                status ===                    "failed"          ? "The order has been failed@@@ to be delivered to you (rejected 3 times)" :
                status ===                           "canceled" ? "~~~"
                                                                : "~~~"                     ,
                 headingEn: `The order ${$CurrentOrder___Store._id} has an delivery update!`,
                subtitleEn: `    Empty                                                     `,
            },
            {
                baseURL: "https://waseminarcnpm2.azurewebsites.net"  ,
            },
        );

    };

    let tabNumber: number = 1;

    $: (async () => {
        console.info("call!");
        if ($CurrentDeliveryStore.orderId        === ""
        ||  $CurrentDeliveryStore.orderId.length === 1) {
              return
        }
        const result = await axios.get(
           `https://waseminarcnpm2.azurewebsites.net/protected/order?id=${$CurrentDeliveryStore.orderId}`
        );
        if (result.status === 200
        ||  result.status === 201) {
            $CurrentOrder___Store = result.data ;
        }
    })();
</script>

<dialog  class="max" id="deliver-detail">
    <div class="                                             "                               >
        <div>
            <div class="                  small-space        "></div>
            <nav class="         tabbed   small              ">
                <!-- svelte-ignore a11y_missing_attribute --><!-- svelte-ignore a11y_click_events_have_key_events --><!-- svelte-ignore a11y_no_static_element_interactions -->
                <a class={`${tabNumber === 1 ? "active" : ""}`} on:click={async () => { tabNumber = 1; }}>
                    <i>info</i>
                    <span>Info Delivery</span>
                </a>
                <!-- svelte-ignore a11y_missing_attribute --><!-- svelte-ignore a11y_click_events_have_key_events --><!-- svelte-ignore a11y_no_static_element_interactions -->
                <a class={`${tabNumber === 2 ? "active" : ""}`} on:click={async () => { tabNumber = 2; }}>
                    <i>info</i>
                    <span>Info Order@@@</span>
                </a>
            </nav>
            <div class={`page   no-padding left ${tabNumber === 1 ? "active" : ""}`}>
                <div class="medium-space"></div>
                <h5  class="center-align">Info Delivery</h5>
                <div class="medium-space"></div>
                <article class="large-elevate     no-round
                                             inverse-surface                  ">
                    <details            open                                   >
                        <summary class="none inverse-primary-text center-align">
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a   class="wave row                  center-align">
                                <i class="tiny-padding fa-solid fa-truck-arrow-right"></i>
                                Detailed Information
                                <i class="tiny-padding fa-solid fa-truck-arrow-right"></i>
                            </a>
                        </summary>
                        <!-- svelte-ignore a11y_missing_attribute -->
                        <a class="row wave inverse-surface">
                            <i class="tiny-padding fa-solid fa-calendar"></i>
                            Delivery Date?!
                            <br>
                            {$CurrentDeliveryStore
                        .date}
                        </a>
                        <hr>
                        <!-- svelte-ignore a11y_missing_attribute -->
                        <a class="row wave inverse-surface">
                            <i class="tiny-padding fa-solid fa-hashtag "></i>
                            Delivery Times!
                            <br>
                            {$CurrentDeliveryStore.deliverTimes}
                        </a>
                        <hr>
                        <!-- svelte-ignore a11y_missing_attribute -->
                        <a class="row wave inverse-surface">
                            <i class="tiny-padding fa-solid fa-flag    "></i>
                            Delivery Status
                            <br>
                            {$CurrentDeliveryStore
                            .status}
                        </a>
                    </details>
                </article>
            </div>
            <div class={`page   no-padding left ${tabNumber === 2 ? "active" : ""}`}>
                <div class="medium-space"></div>
                <h5  class="center-align">Info Order@@@</h5>
                <div class="medium-space"></div>
                <article class="large-elevate     no-round
                                             inverse-surface                  ">
                    <details            open                                   >
                        <summary class="none inverse-primary-text center-align">
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a   class="wave row                  center-align">
                                <i class="tiny-padding fa-solid fa-dolly"></i>
                                Detailed Information
                                <i class="tiny-padding fa-solid fa-dolly"></i>
                            </a>
                        </summary>
                        <!-- svelte-ignore a11y_missing_attribute -->
                        <!-- <a class="row wave inverse-surface">Item</a> -->
                        <!-- svelte-ignore a11y_missing_attribute -->
                        <!-- <a class="row wave inverse-surface">Item</a> -->
                        <details            open                                   >
                            <summary class="none inverse-primary-text center-align">
                                <!-- svelte-ignore a11y_missing_attribute -->
                                <a   class="wave row                  center-align">
                                    <i class="tiny-padding fa-solid fa-user-plus"></i>
                                    Sender Info
                                    <i class="tiny-padding fa-solid fa-user-plus"></i>
                                </a>
                            </summary>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave inverse-surface">
                                <i class="tiny-padding fa-solid fa-signature"></i>
                                Sender !name?! ??????
                                <br>
                                {$CurrentOrder___Store.senderInfo
                                                      .      name}
                            </a>
                            <hr>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave inverse-surface">
                                <i class="tiny-padding fa-solid fa-location-dot"></i>
                                Sender address ??????
                                <br>
                                {$CurrentOrder___Store.senderInfo
                                      .address}
                            </a>
                            <hr>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave inverse-surface">
                                <i class="tiny-padding fa-solid fa-square-phone"></i>
                                Sender !phone! number
                                <br>
                                {$CurrentOrder___Store.senderInfo.phoneNumber}
                            </a>
                        </details>
                        <details            open                                   >
                            <summary class="none inverse-primary-text center-align">
                                <!-- svelte-ignore a11y_missing_attribute -->
                                <a   class="wave row                  center-align">
                                    <i class="tiny-padding fa-solid fa-user-minus"></i>
                                    Receiver Info
                                    <i class="tiny-padding fa-solid fa-user-minus"></i>
                                </a>
                            </summary>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave inverse-surface">
                                <i class="tiny-padding fa-solid fa-signature"></i>
                                Receiver !name?! ??????
                                <br>
                                {$CurrentOrder___Store.receiverInfo
                                                      .        name}
                            </a>
                            <hr>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave inverse-surface">
                                <i class="tiny-padding fa-solid fa-location-dot"></i>
                                Receiver address ??????
                                <br>
                                {$CurrentOrder___Store.receiverInfo
                                        .address}
                            </a>
                            <hr>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave inverse-surface">
                                <i class="tiny-padding fa-solid fa-square-phone"></i>
                                Receiver !phone! number
                                <br>
                                {$CurrentOrder___Store.receiverInfo.phoneNumber}
                            </a>
                        </details>
                        <details            open                                   >
                            <summary class="none inverse-primary-text center-align">
                                <!-- svelte-ignore a11y_missing_attribute -->
                                <a   class="wave row                  center-align">
                                    <i class="tiny-padding fa-solid fa-box-open"></i>
                                    Delivery Info
                                    <i class="tiny-padding fa-solid fa-box-open"></i>
                                </a>
                            </summary>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave inverse-surface">
                                <i class="tiny-padding fa-solid fa-cart-flatbed"></i>
                                Shipment type
                                <br>
                                {$CurrentOrder___Store.deliveryInfo?.shipmentType ?? "Shipment type"}
                            </a>
                            <hr>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave inverse-surface">
                                <i class="tiny-padding fa-solid fa-cart-flatbed"></i>
                                Delivery type
                                <br>
                                {$CurrentOrder___Store.deliveryInfo?.deliveryType ?? "Delivery type"}
                            </a>
                            <hr>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave inverse-surface">
                                <i class="tiny-padding fa-solid fa-hashtag"></i>
                                Status
                                <br>
                                {$CurrentOrder___Store.deliveryInfo?.status ?? "Status"}
                            </a>
                            <hr>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave inverse-surface">
                                <i class="tiny-padding fa-solid fa-expand"></i>
                                Package size
                                <br>
                                {$CurrentOrder___Store.deliveryInfo?.packageSize ?? 0}
                            </a>
                            <hr>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave inverse-surface">
                                <i class="tiny-padding fa-solid fa-calendar-xmark"></i>
                                Pick up date
                                <br>
                                {$CurrentOrder___Store.deliveryInfo?.pickupDate ?? "01-01-2024"}
                            </a>
                            <hr>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave inverse-surface">
                                <i class="tiny-padding fa-solid fa-calendar-check"></i>
                                Pick up time
                                <br>
                                {$CurrentOrder___Store.deliveryInfo?.pickupTime ?? "00:00:0000"}
                            </a>
                            <hr>
                            <!-- svelte-ignore a11y_missing_attribute -->
                            <a class="row wave inverse-surface">
                                <i class="tiny-padding fa-solid fa-dollar-sign"></i>
                                Value
                                <br>
                                {$CurrentOrder___Store.deliveryInfo?.value ?? 0}
                            </a>
                        </details>
                    </details>
                </article>
            </div>
        </div>
    </div>
    <footer  class="fixed responsive max transparent">
        <div class="padding absolute center bottom center-align">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="center-align circle tertiary large-elevate" on:click={OnClick_QRCodeButton}>
                <i  class="fa-solid fa-qrcode"></i>
            </button>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="center-align circle tertiary large-elevate" on:click={OnClick_CameraButton}>
                <i  class="fa-solid fa-camera"></i>
            </button>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="center-align circle error    large-elevate" on:click={OnClick_CloseButton}>
                <i  class="fa-solid fa-xmark"></i>
            </button>
        </div>    
    </footer>
</dialog>



