import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleComponent } from '@shared/title/title.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { UsersService } from '@services/users.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title title="User"></app-title>
    @if(user()) {
    <section>
      <img [srcset]="user()?.avatar" alt="user()!.avatar" />

      <div>
        <h3>{{ user()?.first_name }} {{ user()?.last_name }}</h3>
        <p>{{ user()?.email }}</p>
      </div>
    </section>
    } @else {
    <p>Loading...</p>
    }
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class UserComponent {
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);
  public user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.usersService.getUserById(id))
    )
  );
  
  titleLabel = computed(() =>
    'Informacion del usuario' + this.user()
      ? this.user()?.first_name + ' ' + this.user()?.last_name
      : 'Información no encontrada'
  );

  constructor() {
    console.log(this.route.params);
  }
}
