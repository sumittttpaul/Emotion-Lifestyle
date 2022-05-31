import React, { FC, ReactNode } from 'react';
import { ColorState } from './state/ColorState';
import { AvatarState } from './state/AvatarState';
import { ProfileURLState } from './state/ProfileURLState';
import { DatePickerState } from './state/DatePickerState';
import { DOBState } from './state/DOBState';
import { LoaderState } from './state/LoadingState';

interface IProps {
  children: ReactNode;
}

/**
 * @author
 * @function @StateProvider
 **/

export const StateProvider: FC<IProps> = (props) => {
  return (
    <ColorState>
      <LoaderState value={{ show: false }}>
        <AvatarState value={{ show: false }}>
          <DatePickerState value={{ show: false }}>
            <DOBState value={{ day: 0, month: 0, year: 0 }}>
              <ProfileURLState
                value={{ URL: '/images/user.png', change: false }}
              >
                {props.children}
              </ProfileURLState>
            </DOBState>
          </DatePickerState>
        </AvatarState>
      </LoaderState>
    </ColorState>
  );
};
