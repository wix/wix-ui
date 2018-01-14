export const activeViewBox = '0 0 41 32';
export const activePathD = 'M0.169 17.815c0.169 1.098 0.76 2.111 1.689 2.871l14.269 10.385c1.942 1.435 4.644 1.013 6.079-0.844l18.069-23.303c1.435-1.858 1.098-4.559-0.844-5.995s-4.644-1.098-6.164 0.844l-15.367 19.842-10.723-7.852c-1.942-1.435-4.644-1.013-6.164 0.844-0.76 0.929-1.013 2.111-0.844 3.208z';

export const inactiveViewBox = '0 0 143 32';
export const inactivePathD = 'M0 0h142.545v32h-142.545v-32z';

export const getViewBox = checked => checked ? activeViewBox : inactiveViewBox;

export const getPathDescription = checked => checked ? activePathD : inactivePathD;
