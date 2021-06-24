import { Subject } from 'rxjs';
import { IMultiSelect } from '../../field-config-multiselect.interface';

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
  setDatabase(val: IMultiSelect[], maxLevel: number): void {
    this.privateDatabase = val;
    this.maxLevel = maxLevel;

    // const firstLevelKeyValueArray: { [key: string]: string }[] = [];
    // val.forEach(element => {
    //   firstLevelKeyValueArray.push({ key: element.key, value: element.value });
    // });

    this.theLatestDatabase = { key_value_pair_0: this.getSelection(val, 0) };
  }

  getDatabase(): { [key: string]: any } {
    return this.theLatestDatabase;
  }

  /**
   * This method is called the moment when
   * first loading of saved data
   * user change the combo box
   * @param val the selected value of the combo box / saved data
   * @param lvl to identify the level of the dependant, start from 0, 1, 2, 3...
   */
  setValue(val: string, lvl: number): void {
    // catch the next level if any, and reset the following lever after the next level
    for (let i = lvl; i < this.maxLevel; i++) {
      this.theLatestDatabase = { ...this.theLatestDatabase, ['selected_value_' + i]: lvl === i ? val : '' };
      if (i !== lvl) {
        this.theLatestDatabase = { ...this.theLatestDatabase, ['key_value_pair_' + i]: [] };
      }
    }
    // fill the key_value_pair
    if (lvl !== (this.maxLevel - 1)) {
      this.theLatestDatabase = {
        ...this.theLatestDatabase,
        ['key_value_pair_' + (lvl + 1)]: this.getSelection(
          this.privateDatabase,
          (lvl + 1),
        ),
      };
    }
    this.refreshStorage();
  }

  getSelection(db: IMultiSelect[], lvl: number): { [key: string]: any }[] {
    const currentLevelKeyValueArray: { [key: string]: string }[] = [];
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
