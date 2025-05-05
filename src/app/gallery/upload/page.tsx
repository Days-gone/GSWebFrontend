'use client';

import { useState, useRef } from 'react';
import { Button, Input } from '@heroui/react';
import Link from 'next/link';
import { uploadSliceFile } from '@/app/lib/datafetch';

export default function Update() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('请先选择一个文件！');
      return;
    }

    try {
      const result = await uploadSliceFile(file);
      setUploadStatus(result.message);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setUploadStatus(
        error instanceof Error ? error.message : '上传出错，请检查网络或服务器。'
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Upload Section */}
      <section className="py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          上传岩石切片
        </h1>
        <div className="max-w-lg mx-auto bg-white shadow-xl rounded-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2">
                选择切片文件
              </label>
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="w-full"
                accept="image/*"
              />
            </div>
            <Button
              onPress={handleUpload}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 text-lg py-3 rounded-md"
              isDisabled={!file}
            >
              上传文件
            </Button>
            {uploadStatus && (
              <p
                className={`text-center text-lg ${
                  uploadStatus.includes('成功') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {uploadStatus}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}