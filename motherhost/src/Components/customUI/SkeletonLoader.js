import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Fragment} from 'react';

const SkeletonLoader = () => {
  const loader = [1, 2, 3, 4, 5];
  return (
    <SkeletonPlaceholder>
      {loader.map(index => {
        return (
          <Fragment key={index}>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              marginBottom={10}
              marginTop={12}
              marginRight={10}
              marginLeft={10}
              borderRadius={10}>
              <SkeletonPlaceholder.Item
                height={100}
                borderRadius={4}
                flex={1}
                marginHorizontal={5}
                flexDirection="row"
              />
            </SkeletonPlaceholder.Item>
          </Fragment>
        );
      })}
    </SkeletonPlaceholder>
  );
};
export default SkeletonLoader;
