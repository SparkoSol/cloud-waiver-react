'use client';
import {twMerge} from "tailwind-merge";

const Heading = ({
                   title,
                   subtitle,
                   center,
                   titleClasses='',
                   subTitleClasses=''
                 }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className={twMerge(`mb-1 ${titleClasses}`)}>
        {title}
      </div>
      <div className={twMerge(`text-base ${subTitleClasses}`)}>
        {subtitle}
      </div>
    </div>
  );
}

export default Heading;