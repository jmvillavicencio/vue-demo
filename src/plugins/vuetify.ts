import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#05122A',
    surface: '#0d1b3e',
    'surface-variant': '#1a2a52',
    primary: '#42b883',
    'primary-darken-1': '#33a06f',
    secondary: '#35495e',
    'secondary-darken-1': '#2c3e50',
    error: '#cf6679',
    info: '#2196F3',
    success: '#4caf50',
    warning: '#fb8c00',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme,
    },
  },
})
