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
    <div className="w-auto flex flex-col md:flex-row px-4 md:px-8 gap-4 md:gap-8">
      <div className="md:w-1/2 flex flex-col p-1">
        <Image src={imageSrc} alt={altText} layout="responsive" width={300} height={300} className='rounded-lg shadow-lg'/>
        <p className = "text-gray-500 italic text-xs md:text-sm mt-2">{descriptionToImage}</p>
      </div>
      <div className="md:w-1/2 text-left">
        <h1 className = "text-xl md:text-2xl mb-2">{title}</h1>
        <div className = "border-b-[.5px] gray-200"></div>
        <p className = "text-sm md:text-base text-gray-700 mt-4">{description}</p>
      </div>
    </div>
  )
}

export default ImageText