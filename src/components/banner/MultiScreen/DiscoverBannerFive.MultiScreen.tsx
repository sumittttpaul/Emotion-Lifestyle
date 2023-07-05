/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DiscoverBannerFiveContentProps } from '../../../contents/home/discover/Home.Discover.Banner';
import { Rectangle_BlurDataURL } from '../../loader/BlurDataURL';
import { BannerSmallButtonForBannerFour } from '../../button/banner/Banner.SmallButton.ForBannerFour';
import useScreenSize from '../../../algorithms/ScreenSizeDetection';
import { BannerTitleButton } from '../../button/banner/Banner.TitleButton';
import { BannerUnderlineButton } from '../../button/banner/Banner.UnderlineButton';

const ContainerStyle =
  'text-white group relative p-0 m-0 rounded-xl bg-gradient-to-b overflow-hidden';
const TextContainerStyle = 'px-4 pt-4 pb-[100px] space-y-2';
const HeadingStyle = 'font-[500] tracking-wide text-left w-full';
const DescriptionStyle =
  'text-[14px] whitespace-normal leading-[18px] font-normal text-left w-full opacity-70';
const GetColor = (index: number) => {
  if (index === 0) return 'from-dark-red';
  if (index === 1) return 'from-dark-pink';
  if (index === 2) return 'from-dark-blue';
  if (index === 3) return 'from-dark-yellow';
  if (index === 4) return 'from-dark-purple';
};

export interface DiscoverBannerFiveBrowserProps {
  ContentArray: DiscoverBannerFiveContentProps[];
  Label: string;
}
export const DiscoverBannerFiveBrowser: FC<DiscoverBannerFiveBrowserProps> = (
  props
) => {
  const {
    LargeScreen,
    MediumLargeScreen,
    MediumScreen,
    SmallMediumScreen,
    SmallScreen,
  } = useScreenSize();
  return (
    <div className="flex-col w-full relative p-0 m-0 space-y-2.5">
      <div className="flex justify-start pl-3">
        <BannerTitleButton Label={props.Label} onClick={() => {}} />
      </div>
      <div className="w-full flex relative box-border space-x-5">
        <Swiper
          slidesPerView={
            LargeScreen || MediumLargeScreen
              ? 5
              : MediumScreen
              ? 4
              : SmallMediumScreen
              ? 3
              : SmallScreen
              ? 1
              : 2
          }
          spaceBetween={MediumLargeScreen ? 24 : 15}
          wrapperTag="ul"
          className="w-full flex"
          style={{
            paddingRight: 12,
            paddingLeft: 12,
          }}
        >
          {props.ContentArray.map((value, index) => (
            <SwiperSlide
              key={index}
              tag="li"
              className={`${GetColor(index)} ${ContainerStyle}`}
            >
              <div className="p-0 m-0">
                <div className={TextContainerStyle}>
                  <div className={HeadingStyle}>{value.Heading}</div>
                  <h6 className={DescriptionStyle}>{value.Description}</h6>
                </div>
              </div>
              <BannerUnderlineButton label="Learn more" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export interface DiscoverBannerFiveMobileProps {
  ContentArray: DiscoverBannerFiveContentProps[];
}
export const DiscoverBannerFiveMobile: FC<DiscoverBannerFiveMobileProps> = (
  props
) => {
  return (
    <div className="flex flex-col w-full relative p-0 m-0 space-y-5">
      <h6 className="text-[18px] mx-5">Our services</h6>
      <div className="w-full flex relative box-border space-x-5">
        <Swiper
          slidesPerView={1.5}
          spaceBetween={15}
          wrapperTag="ul"
          className="w-full flex"
          style={{
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          {props.ContentArray.map((value, index) => (
            <SwiperSlide
              key={index}
              tag="li"
              className={`rounded-xl ${ContainerStyle}`}
            >
              <div className="p-0 m-0">
                <div className="relative w-full h-full">
                  <div className="absolute z-[1] h-full w-full bg-transparent" />
                  <Image
                    className="rounded-xl"
                    width={490}
                    height={275}
                    src={value.Image}
                    placeholder="blur"
                    blurDataURL={Rectangle_BlurDataURL}
                    alt=""
                  />
                </div>
                <div className={TextContainerStyle}>
                  <h6 className={`text-[16px] ${HeadingStyle}`}>
                    {value.Heading}
                  </h6>
                  <h6 className={DescriptionStyle}>{value.Description}</h6>
                </div>
              </div>
              <BannerSmallButtonForBannerFour label="Learn More" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
