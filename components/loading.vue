<template lang="html">
  <div class="columns loader" v-if="!this.$store.state.loaded">
    <div class="column col-3 hide-xs">
    </div>
    <div class="column col-1 loader-image hide-xs">
      <img alt="Distrochooser Logo" title="Distrochooser Logo" src="/logo.png">
    </div>
    <div class="column col-6 loader-text hide-xs">
     <h1>{{ this.welcomeHeader[this.$store.state.language] }} <b>5</b></h1>
     <p v-html="this.longDescriptions[this.$store.state.language]"></p>
    </div>
    <div class="column show-xs mobile-text">
      <div class="centered mobile-logo">
        <img alt="Distrochooser Logo" title="Distrochooser Logo" src="/logo.png">
      </div>
      <h1>{{ this.welcomeHeader[this.$store.state.language] }} </h1>
      <p v-html="this.longDescriptions[this.$store.state.language]"></p>
    </div>
    <div class="footer">
     <a :title = "this.$store.state.language === 'de'? 'Impressum' : 'Contact'" :href="'/info/'+this.$store.state.language+'/contact/'"> {{this.$store.state.language === 'de'? 'Impressum' : 'Contact'}}</a>
     <a :title = "this.$store.state.language === 'de'? 'Datenschutz' : 'Privacy'" :href="'/info/'+this.$store.state.language+'/privacy/'"> {{ this.$store.state.language === 'de'? 'Datenschutz' : 'Privacy'}}</a>
    </div>
  </div>
</template>

<script>
import i18n from '~/mixins/i18n'
export default {
  mixins: [i18n],
  created: function () {
    if (this.$route.params.lang !== undefined) {
      var l = this.$route.params.lang
      this.$store.commit("setLanguage", this.locales.indexOf(l) !== -1 ? l : 'en')
    } else {
      this.$store.commit("setLanguage", 'de')
    }
    //Backwards compalibity for &l=2
    if (typeof this.$route.query['l'] !== 'undefined') {
      var raw = parseInt(this.$route.query['l'])      
      this.$store.commit("setLanguage", raw === 1 ? 'de' : 'en')
    }
    // Load old test
    if (this.$route.params.test !== undefined) {
      this.$store.commit("setTest", this.$route.params.test)
    }

    this.$store.commit("setUserAgent", typeof navigator === 'undefined' ? '' : navigator.userAgent)
    this.$store.commit("setReferrer", typeof document === 'undefined' ? '' : document.referrer)
  }
}
</script>

<style scoped>
  .loader-text{
    border-left: 1px solid #50596c;
    padding-top: 1.6em;
    margin-top: 15%;
    text-align: justify;
    padding-left: 2em;
  }
  .loader-image{
    margin-top: 17%;    
    text-align: right;
    margin-right: 1em;
  }
  .loader-indicator{
    margin-top:1em;
    display: block;
    font-weight: bold;
  }
  .mobile-logo{
    display: block;
    text-align: center;
    margin-bottom: 2em;
  }
  .mobile-text{
    text-align: justify;
  }
  .footer{
    position: fixed;
    bottom: 0px;
    margin-bottom: 1em;
    margin-left: 1em;
    text-align: center;
    width: 100%;
  }
  .footer *:after {
    content: " |"
  }
  .footer *:last-child:after {
    content: ""
  }
  h1{
    font-size: 2em;
    text-align: left;
  }
</style>
