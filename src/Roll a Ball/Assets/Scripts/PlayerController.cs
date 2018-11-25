using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PlayerController : MonoBehaviour {
  public float speed;
  public Text pickUpCountText;
  public Text winText;

  private new Rigidbody rigidbody;
  private int pickUpCount;

  void Start() {
    rigidbody = GetComponent<Rigidbody>();
    pickUpCount = 0;
    UpdatePickUpCountText();
    winText.text = "";
  }

  void FixedUpdate() {
    rigidbody.AddForce(new Vector3(Input.GetAxis("Horizontal"), 0.0f, Input.GetAxis("Vertical")) * speed);
  }

  void OnTriggerEnter(Collider other) {
    if (other.gameObject.CompareTag("Pick Up")) {
      other.gameObject.SetActive(false);
      pickUpCount++;
      UpdatePickUpCountText();
    }
  }

  void UpdatePickUpCountText() {
    pickUpCountText.text = "Pick Up Count: " + pickUpCount.ToString();

    if (pickUpCount >= 12) {
      winText.text = "YOU WIN";
    }
  }
}
