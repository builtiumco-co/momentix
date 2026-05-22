export async function compressPhotos(files) {
  const compressed = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Pass through if under 1.5MB
    if (file.size <= 1.5 * 1024 * 1024) {
      compressed.push(file);
      continue;
    }
    
    try {
      const compressedFile = await compressImage(file, 1200, 0.82);
      compressed.push(compressedFile);
    } catch (e) {
      console.error('Failed to compress file', file.name, e);
      // Fallback to original if compression fails
      compressed.push(file);
    }
  }
  
  return compressed;
}

function compressImage(file, maxDimension, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      
      let width = img.width;
      let height = img.height;
      
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas to Blob failed'));
          return;
        }
        
        // Create a new File object with the original name but jpeg extension
        const newName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
        const compressedFile = new File([blob], newName, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        
        resolve(compressedFile);
      }, 'image/jpeg', quality);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image load failed'));
    };
    
    img.src = url;
  });
}
