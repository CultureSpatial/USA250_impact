import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'USA250 Impact Studio',
  
  projectId: 'vtm50qra',
  dataset: 'production',
  
  plugins: [
    structureTool(),
    visionTool({defaultApiVersion: '2024-01-01'}),
  ],
  
  schema: {
    types: schemaTypes,
  },
})
