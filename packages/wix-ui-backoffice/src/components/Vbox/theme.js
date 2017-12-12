export const theme = ({spacing, horizontalAlignment}) => {
  const spacingMap = {
    small: '5px',
    medium: '15px',
    large: '20px'
  };

  return {
    spacing: spacingMap[spacing],
    horizontalAlignment
  };
};
