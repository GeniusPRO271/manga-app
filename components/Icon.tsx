import { ColorValue, Text, View } from "react-native";
import Burgericon from "../assets/icons/bars-filter.svg"
import Playicon from "../assets/icons/play-solid.svg"
import ChevronRighticon from "../assets/icons/chevron-right-solid.svg"
import ChevronLefticon from "../assets/icons/chevron-left-solid.svg"

class IconClass {
  render(params: IconParams): React.JSX.Element {
    return (
      <View>
        <Text>ERROR AT LOADING ICON {params.alt}</Text>
      </View>
    );
  }
}

class BurgerFilterIcon extends IconClass {
  render(params: IconParams): React.JSX.Element {
    return <Burgericon width={params.width} height={params.height} fill={params.fill}/>;
  }
}

class PlayButtonIcon extends IconClass {
  render(params: IconParams): React.JSX.Element {
    return <Playicon width={params.width} height={params.height} fill={params.fill}/>;
  }
}

class ChevronRight extends IconClass {
  render(params: IconParams): React.JSX.Element {
    return <ChevronRighticon width={params.width} height={params.height} fill={params.fill}/>;
  }
}

class ChevronLeft extends IconClass {
  render(params: IconParams): React.JSX.Element {
    return <ChevronLefticon width={params.width} height={params.height} fill={params.fill}/>;
  }
}

type IconParams = {
  alt: string;
  source: keyof typeof IconSource;
  width: number;
  height: number;
  fill?: ColorValue
};

type IconList = {
  [key: string]: IconClass;
};

const IconSource = {
    "barsfiler": 0,
    "playbutton": 1,
    "chevron_right":2,
    "chevron_left":3

}

const iconList: IconList = {
  barsfiler: new BurgerFilterIcon(),
  playbutton: new PlayButtonIcon(),
  chevron_right: new ChevronRight(),
  chevron_left: new ChevronLeft()
};

function getIconSource(userInput: string | number): IconClass | undefined {
  const selectedIcon = iconList[userInput];

  return selectedIcon;
}

export default function Icon(params: IconParams): React.JSX.Element {
  const selectedIconSource = getIconSource(params.source);

  if (selectedIconSource) {
    return <View>{selectedIconSource.render(params)}</View>;
  } else {
    return (
      <View>
        <Text>ERROR AT LOADING ICON {params.alt}</Text>
      </View>
    );
  }
}
