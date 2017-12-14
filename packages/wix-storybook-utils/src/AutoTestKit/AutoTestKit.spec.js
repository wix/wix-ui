import fs from 'fs';
import path from 'path';
import DriverParser from './DriverParser';
import ParsedBadgeTestKitJSON from './parsedBadgeTestKit';

const BadgeTestKit = fs.readFileSync(path.resolve(path.join(__dirname, 'BadgeDriverString.txt')));

const InputTestKit = fs.readFileSync(path.resolve(path.join(__dirname, 'InputDriverString.txt')));

describe('AutoTestKit', () => {

  describe('badge testKit', () => {
    it('should return exactly the object is expected', () => {
      const result = new DriverParser(BadgeTestKit).parse();
      expect(result).toEqual(ParsedBadgeTestKitJSON);
    });
  });
});
