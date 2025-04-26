import React from 'react'
import Image from 'next/image'

interface ImageTextProps {
  imageSrc: string
  altText: string
  title: string
  descriptionToImage?: string
  description: string
}

const ImageText: React.FC<ImageTextProps> = ({ imageSrc, altText, title, descriptionToImage, description }) => {
  return (
    <div className="w-auto flex flex-row px-8 gap-8">
      <div className="w-1/2 flex flex-col p-1">
        <Image src={imageSrc} alt={altText} layout="responsive" width={300} height={300} className='rounded-lg shadow-lg'/>
        <p className = "text-gray-500 italic text-sm mt-2">{descriptionToImage}</p>
      </div>
      <div className="w-1/2 text-left">
        <h1 className = "text-2xl mb-2">{title}</h1>
        <div className = "border-b-[.5px] gray-200"></div>
        <p className = "mt-4">{description}</p>
      </div>
    </div>
  )
}

export default ImageText