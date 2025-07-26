import { BlobServiceClient, ContainerClient, BlobClient } from '@azure/storage-blob';

export interface AzureConfig {
  accountName: string;
  accountKey: string;
  containerName: string;
}

export interface BlobData {
  key: string;
  data: any;
  timestamp: string;
}

class AzureBlobService {
  private blobServiceClient: BlobServiceClient | null = null;
  private containerClient: ContainerClient | null = null;
  private config: AzureConfig | null = null;
  private isInitialized = false;

  // Azure Blob Storage 초기화
  async initialize(config: AzureConfig): Promise<boolean> {
    try {
      this.config = config;

      // Blob Service Client 생성
      const connectionString = `DefaultEndpointsProtocol=https;AccountName=${config.accountName};AccountKey=${config.accountKey};EndpointSuffix=core.windows.net`;
      this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

      // Container Client 생성
      this.containerClient = this.blobServiceClient.getContainerClient(config.containerName);

      // Container가 존재하는지 확인하고 없으면 생성
      const containerExists = await this.containerClient.exists();
      if (!containerExists) {
        await this.containerClient.create();
        console.log('✅ Azure Blob Container 생성됨:', config.containerName);
      }

      this.isInitialized = true;
      console.log('✅ Azure Blob Storage 초기화 완료');
      return true;
    } catch (error) {
      console.error('❌ Azure Blob Storage 초기화 실패:', error);
      return false;
    }
  }

  // 환경 변수에서 Azure 설정 로드
  async initializeFromEnvironment(): Promise<boolean> {
    const config: AzureConfig = {
      accountName: import.meta.env.VITE_AZURE_STORAGE_ACCOUNT_NAME || '',
      accountKey: import.meta.env.VITE_AZURE_STORAGE_ACCOUNT_KEY || '',
      containerName: import.meta.env.VITE_AZURE_STORAGE_CONTAINER_NAME || 'course-data',
    };

    if (!config.accountName || !config.accountKey) {
      console.warn('⚠️ Azure Storage 환경 변수가 설정되지 않음. LocalStorage를 사용합니다.');
      return false;
    }

    return this.initialize(config);
  }

  // 데이터 저장
  async saveData(key: string, data: any): Promise<boolean> {
    if (!this.isInitialized || !this.containerClient) {
      console.warn('⚠️ Azure Blob Storage가 초기화되지 않음. LocalStorage를 사용합니다.');
      return this.saveToLocalStorage(key, data);
    }

    try {
      const blobData: BlobData = {
        key,
        data,
        timestamp: new Date().toISOString(),
      };

      const blobClient = this.containerClient!.getBlobClient(`${key}.json`);
      const blobContent = JSON.stringify(blobData);

      // Azure Blob Storage API v12 사용
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload(blobContent, blobContent.length, {
        blobHTTPHeaders: {
          blobContentType: 'application/json',
        },
      });

      console.log('✅ Azure Blob에 데이터 저장 완료:', key);
      return true;
    } catch (error) {
      console.error('❌ Azure Blob 저장 실패:', error);
      // 실패 시 LocalStorage로 폴백
      return this.saveToLocalStorage(key, data);
    }
  }

  // 데이터 로드
  async loadData(key: string): Promise<any | null> {
    if (!this.isInitialized || !this.containerClient) {
      console.warn('⚠️ Azure Blob Storage가 초기화되지 않음. LocalStorage를 사용합니다.');
      return this.loadFromLocalStorage(key);
    }

    try {
      const blobClient = this.containerClient!.getBlobClient(`${key}.json`);
      const exists = await blobClient.exists();

      if (!exists) {
        console.log('📭 Azure Blob에서 데이터를 찾을 수 없음:', key);
        return null;
      }

      const response = await blobClient.download();
      const content = await this.streamToString(response.readableStreamBody!);
      const blobData: BlobData = JSON.parse(content);

      console.log('✅ Azure Blob에서 데이터 로드 완료:', key);
      return blobData.data;
    } catch (error) {
      console.error('❌ Azure Blob 로드 실패:', error);
      // 실패 시 LocalStorage로 폴백
      return this.loadFromLocalStorage(key);
    }
  }

  // 데이터 삭제
  async deleteData(key: string): Promise<boolean> {
    if (!this.isInitialized || !this.containerClient) {
      console.warn('⚠️ Azure Blob Storage가 초기화되지 않음. LocalStorage를 사용합니다.');
      return this.deleteFromLocalStorage(key);
    }

    try {
      const blobClient = this.containerClient!.getBlobClient(`${key}.json`);
      await blobClient.delete();

      console.log('✅ Azure Blob에서 데이터 삭제 완료:', key);
      return true;
    } catch (error) {
      console.error('❌ Azure Blob 삭제 실패:', error);
      // 실패 시 LocalStorage로 폴백
      return this.deleteFromLocalStorage(key);
    }
  }

  // 모든 데이터 삭제
  async clearAllData(): Promise<boolean> {
    if (!this.isInitialized || !this.containerClient) {
      console.warn('⚠️ Azure Blob Storage가 초기화되지 않음. LocalStorage를 사용합니다.');
      return this.clearLocalStorage();
    }

    try {
      const blobs = this.containerClient!.listBlobsFlat();
      const deletePromises: Promise<any>[] = [];

      for await (const blob of blobs) {
        const blobClient = this.containerClient!.getBlobClient(blob.name);
        deletePromises.push(blobClient.delete());
      }

      await Promise.all(deletePromises);
      console.log('✅ Azure Blob에서 모든 데이터 삭제 완료');
      return true;
    } catch (error) {
      console.error('❌ Azure Blob 전체 삭제 실패:', error);
      // 실패 시 LocalStorage로 폴백
      return this.clearLocalStorage();
    }
  }

  // Stream을 문자열로 변환
  private async streamToString(readableStream: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      readableStream.on('data', (data: any) => {
        chunks.push(data.toString());
      });
      readableStream.on('end', () => {
        resolve(chunks.join(''));
      });
      readableStream.on('error', reject);
    });
  }

  // LocalStorage 폴백 메서드들
  private saveToLocalStorage(key: string, data: any): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log('✅ LocalStorage에 데이터 저장 완료:', key);
      return true;
    } catch (error) {
      console.error('❌ LocalStorage 저장 실패:', error);
      return false;
    }
  }

  private loadFromLocalStorage(key: string): any | null {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        console.log('✅ LocalStorage에서 데이터 로드 완료:', key);
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error('❌ LocalStorage 로드 실패:', error);
      return null;
    }
  }

  private deleteFromLocalStorage(key: string): boolean {
    try {
      localStorage.removeItem(key);
      console.log('✅ LocalStorage에서 데이터 삭제 완료:', key);
      return true;
    } catch (error) {
      console.error('❌ LocalStorage 삭제 실패:', error);
      return false;
    }
  }

  private clearLocalStorage(): boolean {
    try {
      localStorage.clear();
      console.log('✅ LocalStorage에서 모든 데이터 삭제 완료');
      return true;
    } catch (error) {
      console.error('❌ LocalStorage 전체 삭제 실패:', error);
      return false;
    }
  }

  // 초기화 상태 확인
  isReady(): boolean {
    return this.isInitialized;
  }

  // Azure 설정 반환
  getConfig(): AzureConfig | null {
    return this.config;
  }
}

// 싱글톤 인스턴스 생성
export const azureBlobService = new AzureBlobService();
