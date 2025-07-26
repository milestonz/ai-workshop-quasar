import { boot } from 'quasar/wrappers';
import { azureBlobService } from 'src/services/azureBlobService';

export default boot(async () => {
  // Azure Blob Storage 초기화
  try {
    const isAzureReady = await azureBlobService.initializeFromEnvironment();
    if (isAzureReady) {
      console.log('✅ Azure Blob Storage 초기화 성공');
    } else {
      console.log('⚠️ Azure Blob Storage 초기화 실패 - LocalStorage 사용');
    }
  } catch (error) {
    console.error('❌ Azure Blob Storage 초기화 오류:', error);
  }
});
