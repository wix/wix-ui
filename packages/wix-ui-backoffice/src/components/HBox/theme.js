export const theme = ({spacing, verticalAlignment, height}) => {
  const spacingMap = {
    small: '5px',
    medium: '15px',
    large: '20px'
  };

  return {
    spacing: spacingMap[spacing],
    verticalAlignment,
    height
  };
};
