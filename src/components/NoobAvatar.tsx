import React from 'react';
import { RobloxAvatar, RobloxAvatarProps } from './RobloxAvatar';

export type NoobAvatarProps = RobloxAvatarProps;

export const NoobAvatar: React.FC<NoobAvatarProps> = (props) => {
  return <RobloxAvatar {...props} />;
};

export const AcronAvatar = NoobAvatar;
