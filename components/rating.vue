<template lang="html">
  <div>
        <p v-if="selectedRating == 0">
            {{ this.text('sys.rate') }}
        </p>
        <p class="star-parent" v-if="selectedRating == 0">
            <span class="star" v-for="(icon, key) in icons">
                <a class="face tooltip tooltip-bottom" :data-tooltip="text('sys.rating-'+key)" :class="{'active': selectedRating == key }"  v-on:click.prevent="setRating(key)">
                    {{ icon }}
                </a>
            </span>
        </p>
        <p v-if="selectedRating != 0">
            {{ this.text('sys.rated') }}
        </p>
  </div>
</template>

<script>
import i18n from '~/mixins/i18n'
export default {
  mixins: [i18n],
  props: ['parent'],
  data: function () {
    return {
      selectedRating: 0,
      icons: {
        1: '😞',
        2: '😐',
        3: '😄'
      }
    }
  },
  methods: {
    setRating: async function (rating) {
      this.selectedRating = parseInt(rating)
      var test = this.$store.state.test
      await this.$store.dispatch('setRating', {
        params:{
          'test': test,
          'rating': rating
        }
      })
    }
  }
}
</script>

<style scoped>
    .star-parent{
        margin-top: -0.5em;
    }
    .star{
        margin-right: 1em;
    }
    .face{
        text-decoration: none;
        color: rgba(69, 77, 93, 0.5);
        cursor: pointer;    
        font-size: 2.3em;
    }
    .active{
        color: #5764c6;
    }
</style>
