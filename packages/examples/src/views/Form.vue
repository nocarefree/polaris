<template>
  <ComponentApiList :apis="apis" />
</template>
<script setup lang="ts">
import ComponentApiList from "../components/ComponentApiList.vue";
import { ComponentApiType } from "../types"


const apis = [{
  label: 'Props',
  types: [
    { name: "acceptCharset", type: "string", description: "Space separated list of character encodings" },
    { name: "action", type: "string", description: "Where to send form-data on submittal" },
    { name: "autoComplete", type: "boolean", description: "Grants the browser the ability to autocomplete input elements" },
    { name: "encType", type: "'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'", description: "Media type when submitting content to server" },
    { name: "implicitSubmit", type: "boolean", description: "Toggles if form submits on Enter keypress. Defaults to true." },
    { name: "method", type: "'post' | 'get' | 'action'", description: "Method used to submit form" },
    { name: "name", type: "string", description: "A unique name for the form" },
    { name: "noValidate", type: "boolean", description: "Whether or not form is validated when submitting" },
    { name: "preventDefault", type: "boolean", description: "Blocks the default form action" },
    { name: "target", type: "'_blank' | '_self' | '_parent' | '_top' | string", description: "Where to display response after form submittal" },
  ]
}, {
  label: 'Event',
  types: [
    { name: 'submit', fun: '(event:Event) =>void' },
  ]
}] as ComponentApiType[];

</script>