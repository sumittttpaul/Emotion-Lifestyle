import React, { FC, Fragment, SyntheticEvent, useState } from 'react';
import { IconButton, useTheme } from '@mui/material';
import { DotsVerticalIcon, ArrowLeftIcon } from '@heroicons/react/solid';
import { SparklesIcon, DesktopComputerIcon } from '@heroicons/react/outline';
import { useSelectAvatarState } from '../../providers/state/SelectAvatarState';
import { useShowAvatarState } from '../../providers/state/ShowAvatarState';
import { FromAvatars } from './SelectAvatarOptions/FromAvatars';
import { FromComputer } from './SelectAvatarOptions/FromComputer';
import { AvatarContainer } from '../container/AvatarContainer';
import SwipeableViews from 'react-swipeable-views';
import CustomTabItem from '../tab/CustomTabItem';
import CustomTabs from '../tab/CustomTabs';
import CustomTabPanel from '../tab/CustomTabPanel';

interface IProps {}

/**
 * @author
 * @function @SelectAvatar
 **/

const SelectAvatar: FC<IProps> = (props) => {
  const { SelectAvatar, setSelectAvatar } = useSelectAvatarState();
  const { setShowAvatar } = useShowAvatarState();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const [TabValue, setTabValue] = useState(false);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setTabValue((prev) => !prev);
    console.log(TabValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const closeModal = () => {
    setSelectAvatar({ setShow: false });
    setShowAvatar({ setShow: true });
  };
  return (
    <AvatarContainer
      show={SelectAvatar.setShow}
      as={Fragment}
      onClose={closeModal}
    >
      <div className="sm:max-w-[500px] flex flex-col justify-center items-center h-full w-full">
        {/* Header */}
        <div className="flex w-full justify-between items-center p-1">
          <IconButton
            onClick={() => {
              closeModal();
            }}
            className="hover:bg-[rgba(0,0,0,0.07)] p-3"
          >
            <ArrowLeftIcon className="h-5" />
          </IconButton>
          <h6 className="text-black font-medium pt-1">
            Change profile picture
          </h6>
          <IconButton className="hover:bg-[rgba(0,0,0,0.07)] p-3">
            <DotsVerticalIcon className="h-5" />
          </IconButton>
        </div>
        {/* Tab & sub heading */}
        <div className="space-y-3 flex flex-col items-center justify-center w-full">
          {/* Sub Heading */}
          <h6 className="text-[13px] px-6 text-black text-left w-full">
            You can choose your profile picture from our one of the best avatar
            collections.
          </h6>
          {/* Tab */}
          <CustomTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <CustomTabItem
              icon={<SparklesIcon className="h-5 opacity-70" />}
              label="From Avatars"
            />
            <CustomTabItem
              icon={<DesktopComputerIcon className="h-5 opacity-70" />}
              label="From Computer"
            />
          </CustomTabs>
          {/* Tab Content */}
        </div>
        {/* Divider */}
        <div className="h-[1px] opacity-20 bg-black w-full" />
        {/* Main */}
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          className="w-full h-full"
          id="SwipeableViews"
          containerStyle={{
            transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
          }}
        >
          <CustomTabPanel value={value} index={0} dir={theme.direction}>
            <FromAvatars />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1} dir={theme.direction}>
            <FromComputer />
          </CustomTabPanel>
        </SwipeableViews>
      </div>
    </AvatarContainer>
  );
};

export default SelectAvatar;