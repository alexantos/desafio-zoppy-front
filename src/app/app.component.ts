import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, MatIconModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {

	private router = inject(Router);

	navega(rota: string) {
		this.router.navigate([rota]);
	}
}
