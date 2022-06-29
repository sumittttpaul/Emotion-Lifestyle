import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { DiscoverSliderIProps } from '../../../contents/store/discover/Store.Discover.Slider';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { Poster_BlurDataURL } from '../../loader/BlurDataURL';
import { TooltipDark } from '../../tooltip/TooltipDark';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';

const HeadingStyle =
  'text-[14px] font-normal text-left w-full whitespace-nowrap overflow-hidden text-ellipsis';
const DiscountStyle =
  'bg-primary-blue-rgb font-[600] text-[11px] py-[5px] px-[10px] mr-[2px] rounded-[4px]';
const OriginalPriceStyle = 'line-through text-[13.5px] opacity-70';
const DiscountedPriceStyle = 'text-[14px]';
const ImageStyle = 'rounded-xl';

interface IProps {
  ContentArray: DiscoverSliderIProps[];
  Wishlist: number;
  setWishlist: Dispatch<SetStateAction<number>>;
}

export const DiscoverSliderDesktopMap: FC<IProps> = (props) => {
  return (
    <>
      {props.ContentArray.map((value, index) => (
        <Button
          key={index}
          component="li"
          disableFocusRipple
          className="text-white group m-0 p-0 space-y-1 min-w-[197.5px] md-900:min-w-[220px] button-text-lower"
          sx={{
            '.MuiTouchRipple-child': {
              backgroundColor: 'rgba(225, 225, 255, 0.5) !important',
            },
          }}
        >
          <div className="w-full flex flex-col relative">
            <div className="relative w-full overflow-hidden">
              <div className="opacity-0 p-2 flex items-start justify-end group-hover:opacity-100 absolute z-[1] transition-opacity duration-300 rounded-md h-[98%] w-full bg-gradient-to-bl from-[rgba(0,0,0,0.3)]">
                <TooltipDark arrow title="Add to Wishlist" placement="top">
                  <motion.button
                    onClick={() => props.setWishlist(index)}
                    whileTap={{ scale: 0.9 }}
                  >
                    {props.Wishlist === index ? (
                      <HeartIconSolid className="h-6 w-6 text-white opacity-100" />
                    ) : (
                      <HeartIconOutline className="h-6 w-6 text-white opacity-80" />
                    )}
                  </motion.button>
                </TooltipDark>
              </div>
              <Image
                height={307}
                width={240}
                objectFit="cover"
                objectPosition="center"
                placeholder="blur"
                loading="lazy"
                className={ImageStyle}
                blurDataURL={Poster_BlurDataURL}
                src={value.Image}
                alt="product slider image"
              />
            </div>
            <h6 className={HeadingStyle}>{value.Heading}</h6>
            <div className="text-xs flex items-center space-x-2 pt-1">
              <h6 className={DiscountStyle}>{value.Discount}</h6>
              <h6 className={OriginalPriceStyle}>
                {`₹${value.OriginalPrice}`}
              </h6>
              <h6
                className={DiscountedPriceStyle}
              >{`₹${value.DiscountedPrice}`}</h6>
            </div>
          </div>
        </Button>
      ))}
    </>
  );
};

export const DiscoverSliderMobileMap: FC<IProps> = (props) => {
  return (
    <>
      {props.ContentArray.map((value, index) => (
        <SwiperSlide
          key={index}
          tag="li"
          className="flex box-border p-0 m-0 h-full w-full"
        >
          <Button
            disableFocusRipple
            className="text-white group m-0 p-0 space-y-1 h-full w-full button-text-lower"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: 'rgba(225, 225, 255, 0.5) !important',
              },
            }}
          >
            <div className="w-full h-full flex flex-col">
              <div className="relative w-full h-full overflow-hidden">
                <div className="opacity-0 flex items-start justify-end group-hover:opacity-100 absolute z-[1] transition-opacity duration-300 rounded-md h-[98%] w-full bg-gradient-to-bl from-[rgba(0,0,0,0.3)]">
                  <motion.button
                    onClick={() => props.setWishlist(index)}
                    whileTap={{ scale: 0.9 }}
                    className="p-2"
                  >
                    {props.Wishlist === index ? (
                      <HeartIconSolid className="h-7 w-7 text-white opacity-100" />
                    ) : (
                      <HeartIconOutline className="h-7 w-7 text-white opacity-80" />
                    )}
                  </motion.button>
                </div>
                <Image
                  height={307}
                  width={240}
                  layout="responsive"
                  objectFit="cover"
                  objectPosition="center"
                  placeholder="blur"
                  loading="lazy"
                  className={ImageStyle}
                  blurDataURL={Poster_BlurDataURL}
                  src={value.Image}
                  alt="product slider image"
                />
              </div>
              <h6 className={HeadingStyle}>{value.Heading}</h6>
              <div className="text-xs flex items-center space-x-1 sm-500:space-x-2 pt-2">
                <h6 className={`hidden xs-400:block ${DiscountStyle}`}>
                  {value.Discount}
                </h6>
                <h6 className={OriginalPriceStyle}>
                  {`₹${value.OriginalPrice}`}
                </h6>
                <h6
                  className={DiscountedPriceStyle}
                >{`₹${value.DiscountedPrice}`}</h6>
              </div>
            </div>
          </Button>
        </SwiperSlide>
      ))}
    </>
  );
};