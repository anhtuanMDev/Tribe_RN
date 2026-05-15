import { StyleSheet, View } from 'react-native';
import { Typography } from '../Typography';
import { pallet } from '../../config/pallet';

type ChipProps = {
  title: string;
  selected: boolean;
};

const Chip = ({ title, selected }: ChipProps) => {
  return (
    <View style={[styles.container, selected && styles.activeChip]}>
      <Typography level="labelLarge">{title}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 32,
    backgroundColor: pallet.variant.secondary[100],
    color: pallet.variant.secondary['900'],
    textAlign: 'center',
  },

  activeChip: {
    backgroundColor: pallet.primary,
    color: pallet.variant.neutral['0'],
  },
});

export { Chip };
