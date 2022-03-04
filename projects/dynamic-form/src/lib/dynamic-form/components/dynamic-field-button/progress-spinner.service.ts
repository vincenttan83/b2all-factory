import { Subject } from 'rxjs';
import { ProgressSpinnerState } from './progress-spinner-state.class';

export class ProgressSpinnerService {

    constructor() { }

    private loaderSource = new Subject<ProgressSpinnerState>();

    loaderStateChanged$ = this.loaderSource.asObservable();

    show(): void {
        this.loaderSource.next({ show: true } as ProgressSpinnerState);
    }

    hide(): void {
        this.loaderSource.next({ show: false } as ProgressSpinnerState);
    }
}
