export const submitToGAS = async (type: string, data: any) => {
  const url = import.meta.env.VITE_GAS_WEB_APP_URL;
  if (!url) {
    console.warn("VITE_GAS_WEB_APP_URL is not set. 模擬成功送出。");
    return { status: "success", mock: true };
  }

  const payload = { type, data };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (result.status === "error") {
    throw new Error(result.message);
  }
  return result;
};

export const resizeImageAndToBase64 = (file: File, maxWidth = 1200): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // 將圖片壓縮至JPEG 0.8 品質
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
