import { Subject } from 'rxjs';
import { IMultiSelect } from '../../interfaces/multi-select.interface';

export class DynamicFieldSelectService {

  private privateDatabase: IMultiSelect[] = [];
  private maxLevel!: number;
  private storageSubject = new Subject<{ [key: string]: any }>();
  storageChanged$ = this.storageSubject.asObservable();

  theLatestDatabase!: { [key: string]: any };

  constructor() { }

  /**
   * This is the init of the "outer join" db structure of key value object with children
   * Should only call once
   * @param val the outer join database object
   */
  setDatabase(originalDatabase: IMultiSelect[], maxLevel: number, theSaveValues: string[]): void {
    this.privateDatabase = originalDatabase;
    this.maxLevel = maxLevel;
    // this.theLatestDatabase = { key_value_pair_0: this.getSelection(originalDatabase, 0) };
    // for (let i = 0; i < maxLevel; i++) {
    //   this.theLatestDatabase = { ...this.theLatestDatabase, ['selected_value_' + i]: theSaveValues[i] };
    // }

    let i = 0;

    for (const element of theSaveValues) {
      this.theLatestDatabase = { ...this.theLatestDatabase, ['key_value_pair_' + i]: this.getSelection(originalDatabase, i), ['selected_value_' + i]: element };
      i += 1;
      if (!element) { break; }
    }

  }

  getDatabase(): { [key: string]: any } {
    return this.theLatestDatabase;
  }

  /**
   * This method is called the moment when
   * first loading of saved data
   * user change the combo box
   * @param selectedValue the selected value of the combo box / saved data
   * @param currentLevel to identify the level of the dependant, start from 0, 1, 2, 3...
   */
  setValue(selectedValue: string | null, currentLevel: number): void {
    // catch the next level if any, and reset the following lever after the next level
    for (let i = currentLevel; i < this.maxLevel; i++) {
      // clean the next level of selected value, current value keep
      this.theLatestDatabase = { ...this.theLatestDatabase, ['selected_value_' + i]: currentLevel === i ? selectedValue : '' };
      // clean the next leve of key value
      if (i !== currentLevel) {
        this.theLatestDatabase = { ...this.theLatestDatabase, ['key_value_pair_' + i]: [] };
      }
    }
    // since the next level of selection is cleaned, we need to get back correct choices
    if (currentLevel !== (this.maxLevel - 1)) {
      this.theLatestDatabase = {
        ...this.theLatestDatabase,
        ['key_value_pair_' + (currentLevel + 1)]: this.getSelection(this.privateDatabase, (currentLevel + 1)),
      };
    }
    this.refreshStorage();
  }

  getSelection(db: IMultiSelect[], lvl: number): { [key: string]: any }[] {
    const currentLevelKeyValueArray: { [key: string]: any }[] = [];
    let selectedChildren: IMultiSelect[] | undefined = db;

    // if root level, just render the root level key n value
    if (lvl === 0) {
      this.privateDatabase.forEach(element => {
        currentLevelKeyValueArray.push({ key: element.key, value: element.value });
      });
    } else {
      // if not root level, get the children by it's selected parent
      // this for loop will keep running for X level down
      for (let i = 0; i < lvl; i++) {
        selectedChildren = selectedChildren?.find(findX => findX.value === this.theLatestDatabase['selected_value_' + i])?.children;
      }

      // once got the children, render and return the list
      selectedChildren?.forEach(element => {
        currentLevelKeyValueArray.push({ key: element.key, value: element.value });
      });
    }

    return currentLevelKeyValueArray;
  }

  filteredPrivateDatabase(db: IMultiSelect[] | undefined, selectedString: string): IMultiSelect | undefined {
    return db?.find(findX => {
      return findX.value === selectedString;
    });
  }

  refreshStorage(): void {
    this.storageSubject.next(this.theLatestDatabase);
  }

}
