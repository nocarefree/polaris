import { useMediaQuery } from "@vueuse/core";


const T2 = {
    condensedResourceList: "457px",
    condensedPage: "489px",
    mediumPage: "767px",
    frozenPlanSingleColumnLayout: "978px",
    activePlanSingleColumnLayout: "1020px",
    singleColumnLayout: "1044px",
    largePage: "1440px"
}




export function isCondensedPage() {
    return useMediaQuery(`(max-width: ${T2.condensedPage})`)
}
function wf() {
    return useMediaQuery("(max-width: 47.9975em)")
}
function vXt() {
    return useMediaQuery(`(max-width: ${T2.singleColumnLayout})`)
}
function gXt() {
    return useMediaQuery(`(max-width: ${T2.condensedResourceList})`)
}
function yXt() {
    return useMediaQuery(`(max-width: ${T2.mediumPage})`)
}
function bXt() {
    return useMediaQuery(`(max-width: ${T2.largePage})`)
}