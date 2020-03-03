import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { UploadRequest, PrepareUploadResponse } from '../../../src/apiClient/asset'
import AssetUpload from '../../../src/form/assetUpload'

class NoOpUploadRequest extends UploadRequest {
  async prepareUploadRequest(file: File): Promise<PrepareUploadResponse> {
    return { url: 'http://foo.com', headers: {} }
  }
}

storiesOf('Asset Upload', module)
  .add('File Upload', () => (
    <div style={{ border: '1px solid #ccc' }}>
      <AssetUpload uploadRequest={NoOpUploadRequest} />
    </div>
  ))
  .add('Image Upload', () => (
    <div style={{ border: '1px solid #ccc' }}>
      <AssetUpload uploadRequest={NoOpUploadRequest} isImage />
    </div>
  ))
