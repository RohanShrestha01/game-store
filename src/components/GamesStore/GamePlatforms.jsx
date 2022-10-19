import { WindowsSvg } from '../../icons/WindowsSvg';
import { AppleSvg } from '../../icons/AppleSvg';
import { LinuxSvg } from '../../icons/LinuxSvg';
import { PlaystationSvg } from '../../icons/PlaystationSvg';
import { XboxSvg } from '../../icons/XboxSvg';
import { NintendoSvg } from '../../icons/NintendoSvg';

export const GamePlatforms = ({ platforms }) =>
  platforms?.map(({ platform: { slug } }, i) =>
    slug === 'pc' ? (
      <WindowsSvg key={i} />
    ) : slug === 'playstation' ? (
      <PlaystationSvg key={i} />
    ) : slug === 'xbox' ? (
      <XboxSvg key={i} />
    ) : slug === 'nintendo' ? (
      <NintendoSvg key={i} />
    ) : slug === 'mac' ? (
      <AppleSvg key={i} />
    ) : slug === 'linux' ? (
      <LinuxSvg key={i} />
    ) : (
      ''
    )
  );
