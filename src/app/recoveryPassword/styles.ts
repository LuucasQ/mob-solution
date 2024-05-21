import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 0},
  cell: {
    width: 59,
    height: 56,
    borderWidth: 2,
    borderColor: 'rgba(15, 150, 227, 1)',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  cellText: {
    color: 'rgba(105, 117, 134, 1)',
    lineHeight: 24,
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});