<script lang="ts">
    const OnClick_CloseButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        await ui("#shipper-google-map");
    };

//  import { GoogleMap   } from "@capacitor/google-maps";
    import { onDestroy
           , onMount     } from            "svelte"     ;
    import { Geolocation } from "@capacitor/geolocation";
//  import                                 "../../node_modules/@maptiler/sdk/dist/maptiler-sdk.css";
    import { Language, Marker
           , Map
           , MapStyle, config } from "@maptiler/sdk";
    import { GeocodingOpenCage_Async
           , DisplaySuccSnackbar
           , DisplayFailSnackbar
           , DisplayInfoSnackbar
           , CurrentDeliveryStore
           , CurrentOrder___Store
           } from "../global";

    let apiKey:      string = "b8nZwIxVOLuy2IGSjEJY";
    let mapRef: HTMLElement = null!;
//  let mapIns: GoogleMap   = null!;
    let mapIns:       Map   = null!;
        config.
        apiKey =
        apiKey ;

    onMount(async () => {
        const position = await Geolocation.getCurrentPosition();
    
//      mapIns = await GoogleMap.create({
//          id         :              "my-map",
//          element    : mapRef as HTMLElement,
//          apiKey     : apiKey               ,
//          forceCreate:     false,
//          language   : undefined,
//          region     : undefined,
//          config     :{
//              center: {
//                  lat: position.coords. latitude,
//                  lng: position.coords.longitude,
//              }       ,
//              zoom: 16,  
//          }           ,
//      });

        mapIns = new Map({
            antialias: !true                    ,
            container: mapRef                   ,
                style: MapStyle.STREETS.DEFAULT ,
            center: [  position.coords .longitude
                     , position.coords . latitude
                    ],
                hash : !true,
                zoom :    16,
            keyboard :  true,
            language : Language.VIETNAMESE,
            
        });

//      const markerId = await mapIns.addMarker({
//          coordinate: {
//              lat: position.coords. latitude,
//              lng: position.coords.longitude,
//          }
//      });

//      const circleId = await mapIns.addCircles([
//          {
//              center: {
//                  lat: position.coords. latitude,
//                  lng: position.coords.longitude, 
//              }         ,
//              radius: 50,
//          }
//      ]);


//      await mapIns.enableIndoorMaps(!true);
//      await mapIns.enableIndoorMaps( true);
//      await mapIns.enableTrafficLayer(!true);
//      await mapIns.enableTrafficLayer( true);
//      await mapIns.enableCurrentLocation(!true);
//      await mapIns.enableCurrentLocation( true);
//      await mapIns.enableAccessibilityElements(!true);
//      await mapIns.enableAccessibilityElements( true);
//      await mapIns.enableTouch();
//      await mapIns.enableClustering();

    });

    onDestroy(async () =>   {
//      if   (      mapIns) {
//            await mapIns.destroy();
//      }
        if (        mapIns) {
                    mapIns.
                    remove();
        }
    });

    let marker1: Marker = null!;
    let marker2: Marker = null!;
    let marker3: Marker = null!;
    CurrentOrder___Store.subscribe(
        async (    order )   =>   {
//      await new Promise(f  =>  setTimeout(f
//              , 3000) );
        while (!mapIns)
        await new Promise(f  =>  setTimeout(f
                , 1000) );        
        marker1?.remove();
        marker2?.remove();
        marker3?.remove();

        const position = await Geolocation.getCurrentPosition();
        await mapIns.onLoadAsync();

        let sCoordsResult = await GeocodingOpenCage_Async($CurrentOrder___Store.  senderInfo.address);
        let rCoordsResult = await GeocodingOpenCage_Async($CurrentOrder___Store.receiverInfo.address);
        if (sCoordsResult.lng === 0.0
        &&  sCoordsResult.lat === 0.0) {
            sCoordsResult = { lng: position.coords.longitude + 0.0001, lat: position.coords.latitude + 0.0000 };
        }
        if (rCoordsResult.lng === 0.0
        &&  rCoordsResult.lat === 0.0) {
            rCoordsResult = { lng: position.coords.longitude - 0.0001, lat: position.coords.latitude - 0.0000 };
        }
        console.log(sCoordsResult);
        console.log(rCoordsResult);

marker1=new Marker({color: "#386663"})
//      .setLngLat([position.coords.longitude + 0.0001, position.coords.latitude + 0.0000])
        .setLngLat([  sCoordsResult.lng               ,   sCoordsResult.lat              ])
        .addTo(mapIns);
marker2=new Marker({color: "#BA1A1A"})
//      .setLngLat([position.coords.longitude - 0.0001, position.coords.latitude - 0.0000])
        .setLngLat([  rCoordsResult.lng               ,   rCoordsResult.lat              ])
        .addTo(mapIns);
marker3=new Marker({color: "#31312B"})
        .setLngLat([position.coords.longitude + 0.0000, position.coords.latitude + 0.0000])
        .addTo(mapIns);
    });
</script>

<dialog  class="max no-padding"  id="shipper-google-map"           >
    <!-- <capacitor-google-map bind:this={mapRef}></capacitor-google-map> -->
    <div class="map           "bind:this={mapRef}></div>
    <div class="padding absolute center
                                 bottom ">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="circle error large-elevate" on:click={OnClick_CloseButton}>
            <i  class="fa-solid fa-xmark"></i>
        </button>
    </div>
</dialog>


<style>
                    .map { display: inline-block; width: 100%; height: 100%; }
/*  capacitor-google-map { display: inline-block; width: 100%; height: 100%; }  */
</style>









