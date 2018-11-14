import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {PostService} from '../services/post.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})

export class PostEditComponent implements OnInit {

constructor(private router: Router, private route: ActivatedRoute, private ps:PostService) { }
post : any = [];

ngOnInit() {
  console.log(this.route.snapshot.params['id']);
  this.ps.getPost(this.route.snapshot.params['id']).subscribe(data =>
  {
    this.post = data;
  })
}

onEditPost(form: NgForm) {
  this.ps.updatePost(this.post[0]._id, form.value.title, form.value.content).subscribe();
  this.router.navigate(['/list']);
  }
}