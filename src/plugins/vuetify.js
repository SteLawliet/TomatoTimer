import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
// Helpers
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
    theme: {
        primary: colors.pink, // #E53935
        secondary: colors.pink.lighten4, // #FFCDD2
        // accent: colors.indigo.base // #3F51B5
        accent: colors.pink.base // #3F51B5
    }

})




