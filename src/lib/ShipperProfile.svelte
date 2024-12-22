<script lang="ts">
    import mary from
"../assets/mary.png";
    import { StaffResultStore } from "../global";

    const OnClick_CloseButton = async (
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        await ui("#shipper-profile");
    };
</script>

<dialog  class="max" id="shipper-profile">
    <div class="medium-space"></div>
    <h5  class="center-align">Shipper Profile</h5>
    <div class="medium-space"></div>
    <img class="circle extra
                center
                    large-elevate                         "
     src={mary}
     alt="    "                    >
    <div class="medium-space"></div>
    <article class="large-elevate no-round inverse-surface">
        <details                open                                         >
            <summary class="    none       inverse-primary-text center-align">
                <!-- svelte-ignore a11y_missing_attribute -->
                <a   class="row wave                            center-align">
                    <i class="tiny-padding fa-solid fa-person-walking"></i>
                    Shipper Information
                    <i class="tiny-padding fa-solid fa-person-walking"></i>
                </a>
            </summary>
            <!-- svelte-ignore a11y_missing_attribute -->
            <a class="row wave inverse-surface">
                <i class="tiny-padding fa-solid fa-cake-candles"></i>
                                         Age
                                         <br/>
                {$StaffResultStore.staff.age               }
            </a>
            <hr>
            <!-- svelte-ignore a11y_missing_attribute -->
            <a class="row wave inverse-surface">
                <i class="tiny-padding fa-solid fa-venus-mars"></i>
                                         Gender
                                         <br/>
                {$StaffResultStore.staff.gender            }
            </a>
            <hr>
            <!-- svelte-ignore a11y_missing_attribute -->
            <a class="row wave inverse-surface">
                <i class="tiny-padding fa-brands fa-hubspot"></i>
                                         HubId
                                         <br/>
                {$StaffResultStore.staff.hubId
                                  .slice(0, -2)            }
            </a>
            <hr>
            <!-- svelte-ignore a11y_missing_attribute -->
            <a class="row wave inverse-surface">
                <i class="tiny-padding fa-solid fa-motorcycle"></i>
                                         MotorcycleCapacity
                                         <br/>
                {$StaffResultStore.staff.motorcycleCapacity}
            </a>
            <hr>
            <!-- svelte-ignore a11y_missing_attribute -->
            <a class="row wave inverse-surface">
                <i class="tiny-padding fa-solid fa-signature"></i>
                                         Name
                                         <br/>
                {$StaffResultStore.staff.name              }
            </a>
            <hr>
            <!-- svelte-ignore a11y_missing_attribute -->
            <a class="row wave inverse-surface">
                <i class="tiny-padding fa-solid fa-id-badge"></i>
                                         UserId
                                         <br/>
                {$StaffResultStore.staff.userId
                                  .slice(0, -2)            }
            </a>
            <hr>
            <!-- svelte-ignore a11y_missing_attribute -->
            <a class="row wave inverse-surface">
                <i class="tiny-padding fa-solid fa-weight-scale"></i>
                                         Weight
                                         <br/>
                {$StaffResultStore.staff.weight            }
            </a>
            <hr>
            <!-- svelte-ignore a11y_missing_attribute -->
            <a class="row wave inverse-surface">
                <i class="tiny-padding fa-solid fa-id-badge"></i>
                                         _id
                                         <br/>
                {$StaffResultStore.staff._id
                                  .slice(0, -2)            }
            </a>
        </details>
    </article>

    <footer  class="           fixed responsive max transparent  ">
        <div class="padding absolute center  bottom              "                               >
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="          circle   error large-elevate" on:click={OnClick_CloseButton}>
                <i  class="fa-solid fa-xmark"></i>
            </button>
        </div>    
    </footer>
</dialog>

<style>img { width: 100px; height: 100px; filter: saturate(150%); }</style>

