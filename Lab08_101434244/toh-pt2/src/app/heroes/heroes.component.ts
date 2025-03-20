import { Component } from "@angular/core";
import { NgIf, NgFor, UpperCasePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RemoveSpacesPipe } from "../remove-spaces.pipe";

import { Hero } from "../hero";
import { HEROES } from "../mock-heroes";

@Component({
  standalone: true,
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
  imports: [FormsModule, NgIf, NgFor, UpperCasePipe, RemoveSpacesPipe],
})
export class HeroesComponent {
  heroes = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
