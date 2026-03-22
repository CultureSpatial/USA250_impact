import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'vtm50qra',
    dataset: 'production'
  },
  
  // Use port 3334 to avoid conflicts with other dev servers
  server: {
    port: 3334,
  },
  
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
