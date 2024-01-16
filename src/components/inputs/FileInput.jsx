import {PhotoIcon} from "@heroicons/react/24/outline";
import {useEffect, useRef} from 'react';

const FileInput = ({label, fileInputRef, image}) => {
  const imagePreviewRef = useRef(null);

  function handleImageUpload() {
    if (fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.className = 'w-full h-full';
        imagePreviewRef.current.innerHTML = '';
        imagePreviewRef.current.appendChild(img);
      };

      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.className = 'w-full h-full';
      imagePreviewRef.current.innerHTML = '';
      imagePreviewRef.current.appendChild(img);
    }
  }, [image, imagePreviewRef]);

  return (
    <div>
      {label && <span className='block text-sm mb-1.5 font-bold text-gray-500 text-start'>{label}</span>}
      <div className='flex items-center gap-6 flex-wrap'>
        <div className='border border-dashed border-2 border-gray-300 rounded-lg p-5 text-sm flex flex-col gap-2 w-52'>
          <PhotoIcon className='w-12 h-12 mx-auto text-gray-500'/>
          <label htmlFor='file-inp' className='flex flex-col items-center'>
            <span className='text-blue-600 hover:text-blue-400 cursor-pointer'>Upload a file</span>
            <input type='file' name='file-inp' id='file-inp' className='hidden' ref={fileInputRef}
                   onChange={handleImageUpload}/>
            <span className='text-gray-500'>or drag and drop</span>
          </label>
        </div>
        <div className='border border-gray-300 w-28 grow sm:grow-0 h-28' ref={imagePreviewRef}>
        </div>
      </div>
    </div>
  )
}

export default FileInput;
